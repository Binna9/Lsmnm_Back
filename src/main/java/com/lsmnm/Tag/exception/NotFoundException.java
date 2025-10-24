package com.lsmnm.Tag.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class NotFoundException extends RuntimeException {

    private final String messageKey;
    private final HttpStatus status;

    public NotFoundException(String messageKey) {
        super(messageKey);
        this.messageKey = messageKey;
        this.status = HttpStatus.NOT_FOUND;
    }
}

