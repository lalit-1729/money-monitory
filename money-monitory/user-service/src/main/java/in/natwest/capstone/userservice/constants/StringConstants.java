package in.natwest.capstone.userservice.constants;

public class StringConstants {
    public static final String emailSubject = "Verify your email with PennyBank";
    public static final String emailTemplate = "<div style=\"font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2\">\n" +
            "  <div style=\"margin:50px auto; padding:20px 0; justify-context: center;\">\n" +
            "    <div style=\"border-bottom:1px solid #eee\">\n" +
            "      <a href=\"\" style=\"font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600\">PennyBank</a>\n" +
            "    </div>\n" +
            "    <p style=\"font-size:1.1em\">Hi,</p>\n" +
            "    <p>Thank you for choosing PennyBank. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>\n" +
            "    <h2 style=\"background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;\">%s</h2>\n" +
            "    <p style=\"font-size:0.9em;\">Regards,<br />PennyBank</p>\n" +
            "    <hr style=\"border:none;border-top:1px solid #eee\" />\n" +
            "    <div style=\"padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300\">\n" +
            "      <p>PennyBank Inc</p>\n" +
            "      <p>Scotland</p>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "</div>";
}
