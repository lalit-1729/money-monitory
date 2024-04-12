package com.stackroute.SendEmailService;

import com.stackroute.SendEmailService.Model.Savings;
import com.stackroute.SendEmailService.Service.EmailSenderService;
import com.stackroute.SendEmailService.Service.SavingsAccountsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
@EnableScheduling
public class EmailScheduler {

    Logger logger = LoggerFactory.getLogger(SendEmailServiceApplication.class);

    @Autowired
    private SavingsAccountsService savingsAccountsService;
    @Autowired
    private EmailSenderService service;


    public List<Savings> getAllSavingsAccount(){
        List<Savings> allSavingsAccounts= savingsAccountsService.getAllSavingsAccount();
        logger.info("In savings account");
        return allSavingsAccounts;
    }

    public void triggerMail()  {

    List<Savings> allSavingsAccounts=getAllSavingsAccount();



                for (Savings user : allSavingsAccounts) {
            String emailSubject = "Savings Summary";
            String emailBody = generateEmailBody(user); // Generate the email body based on user data


            service.sendSimpleEmail(user.getEmail(), emailBody, emailSubject);
        }

    }

    public String generateEmailBody(Savings user) {

        return "Dear " + user.getFirstName()+""+user.getLastName()+",\n\n" +
                "Here's your savings till this week: " +
                "£"+user.getBalanceSavingsAccount()+
                "\n\n" +
                "Keep up the good work on your savings journey! If you have any questions or need assistance, please feel free to reach out to our support team .\n\n"+
                "Best regards,\n" +
                "PennyBank";
    }

    //Send email every monday
    @Scheduled(cron="0 0 0 * * MON")
    public void sendWeeklyEmails(){
        logger.info("Job current time"+new Date());
        triggerMail();
    }

}
