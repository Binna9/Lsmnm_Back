package com.lsmnm.Tag.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class InternalServerException extends RuntimeException {

    private final String messageKey;
    private final HttpStatus status;

    public InternalServerException(String messageKey) {
        super(messageKey);
        this.messageKey = messageKey;
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public InternalServerException(String messageKey, Throwable cause) {
        super(messageKey, cause);
        this.messageKey = messageKey;
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
}

