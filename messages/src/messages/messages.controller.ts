import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-messages.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(public messagesService: MessagesService) {
        
    }

    @Get()
    listMessages() {
        const messages= this.messagesService.findAll();
        if (!messages) {
            throw new NotFoundException('messages not found');
        }
        return messages;
    }
    
    @Post()
    createMessage(@Body() body: CreateMessageDto) {
        return this.messagesService.create(body.content);
    }

    @Get('/:id')
    async getMessage(@Param('id') id: string) {
        const message= await this.messagesService.findOne(id); 
        if (!message) {
            throw new NotFoundException('message not found');
        }
        return message;
    }
}

// other decarators
// @Header('Cache-Control', 'none')
// @Query('id') id: string
