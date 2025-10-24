package com.lsmnm.Tag.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BadRequestException extends RuntimeException {

    private final String messageKey;
    private final HttpStatus status;

    public BadRequestException(String messageKey) {
        super(messageKey);
        this.messageKey = messageKey;
        this.status = HttpStatus.BAD_REQUEST;
    }
}

