import { Body, Controller, Get, Param, Patch, UseGuards,Query } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../gards/auth.gards';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGard } from '../gards/admin.gard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Post()
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user:User) {
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGard)
    approveReport(@Param('id') id: string,@Body()body:ApproveReportDto){
        return this.reportsService.changeApproval(parseInt(id),body.approved);    
    }

    @Get()
    getEstimate(@Query()query:GetEstimateDto) {
        return this.reportsService.createEstimate(query);
    }
}
