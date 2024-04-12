package in.natwest.capstone.userservice.exceptionAdvice;


import in.natwest.capstone.userservice.dto.ExceptionResponse;
import in.natwest.capstone.userservice.exceptions.CustomWebClientException;
import in.natwest.capstone.userservice.exceptions.InvalidFieldException;
import in.natwest.capstone.userservice.exceptions.UserAlreadyExistsException;
import in.natwest.capstone.userservice.exceptions.UserNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class UserControllerExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
//    @ResponseStatus(HttpStatus.NOT_FOUND)
    public @ResponseBody ExceptionResponse handleUserNotFoundException(UserNotFoundException exception, final HttpServletRequest request){
        return new ExceptionResponse(exception.getMessage(), 0, request.getRequestURI());
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
//    @ResponseStatus(HttpStatus.CONFLICT)
    public @ResponseBody ExceptionResponse handleUserExistsException(UserAlreadyExistsException exception, final HttpServletRequest request){
        return new ExceptionResponse(exception.getMessage(), 0, request.getRequestURI());
    }

    @ExceptionHandler(InvalidFieldException.class)
//    @ResponseStatus(HttpStatus.CONFLICT)
    public @ResponseBody ExceptionResponse handleInvalidFieldException(InvalidFieldException exception, final HttpServletRequest request){
        return new ExceptionResponse(exception.getMessage(), 0, request.getRequestURI());
    }

    @ExceptionHandler(CustomWebClientException.class)
//    @ResponseStatus(HttpStatus.CONFLICT)
    public @ResponseBody ExceptionResponse handleWebClientException(CustomWebClientException exception, final HttpServletRequest request){
        return new ExceptionResponse(exception.getMessage(), 0, request.getRequestURI());
    }

    @ExceptionHandler(NullPointerException.class)
    public  @ResponseBody ExceptionResponse handleNPE(NullPointerException exception, final HttpServletRequest request ){
        return new ExceptionResponse(exception.getMessage(), 0, request.getRequestURI());
    }
}
