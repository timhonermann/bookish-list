package com.bookishlist.backend.controlleradvisor;

import com.bookishlist.backend.common.exceptions.ErrorMessage;
import com.bookishlist.backend.common.exceptions.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class ControllerAdvisor {
    private final Logger logger = LoggerFactory.getLogger(ControllerAdvice.class);

    @ExceptionHandler
    public ResponseEntity<ErrorMessage> exceptionHandler(Exception ex, WebRequest req) {
        logger.error(ex.getMessage());

        var status = String.format(
            "%d %s",
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase());

        var errorMessage = new ErrorMessage(
            status,
            ex.getMessage(),
            req.getDescription(false));

        return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorMessage> notFoundExceptionHandler(Exception ex, WebRequest request) {
        logger.error(ex.getMessage());

        var status = String.format(
            "%d %s",
            HttpStatus.NOT_FOUND.value(),
            HttpStatus.NOT_FOUND.getReasonPhrase());

        var errorMessage = new ErrorMessage(
            status,
            ex.getMessage(),
            request.getDescription(false));

        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }
}
