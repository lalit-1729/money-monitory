import { Container, ListItem, Stack, Typography } from "@mui/material";
import React from "react";
import { Box, List } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import faqs from "../../assets/faqs.png";
import { Call, Mail, WhatsApp } from "@mui/icons-material";

export default function FAQs() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const questions = [
    {
      question: "What is the PennyBank's Round-Up Service?",
      answer:
        "PennyBank's Round-Up Service is a feature that automatically rounds up debit card transactions to the nearest pound and transfers the extra amount to an instant access savings account. It's designed to help customers save effortlessly.",
      qNo: 1,
    },
    {
      question: " How can I register in the App and create an instant access savings account?",
      answer:
        "To register, click on the registration link, and follow the on-screen instructions. You will be prompted to provide necessary information, create login credentials, and set up your instant access savings account.",
      qNo: 2,
    },
    {
      question: "How can I view a history of my rounded-up transactions and export it?",
      answer:
        "The app provides a transaction history section where you can view your rounded-up transactions. You can export this data CSV format for your convenience.",
      qNo: 3,
    },
    {
      question: "How can I see the rounded-up amount for each transaction before confirming the payment?",
      answer:
        "The app calculates and displays the rounded-up amount for each transaction before you confirm the payment. This way, you are aware of the additional savings.",
      qNo: 4,
    },
    {
      question: "How can I transfer or withdraw funds from my instant access savings account to my primary account?",
      answer:
        "You can initiate fund transfers or withdrawals from your instant access savings account to your primary account directly going to the services and then selecting Transfer From Savings to Primary Account. The process is simple and secure.",
      qNo: 5,
    },
    {
      question: "How often will I receive summaries of my round-ups via email?",
      answer:
        "You will be receiving weekly emails to view your summaries.",
      qNo: 6,
    },
    {
      question: "Is there a limit to how much I can save through round-ups?",
      answer:
        "There is typically no limit to how much you can save through round-ups. The more transactions you make, the more you can save.",
      qNo: 7,
    },
    {
      question: "How secure is my personal and financial information with the PennyBank?",
      answer:
        "PennyBank prioritizes the security of your data. The app typically uses encryption and follows strict security protocols to protect your information.",
      qNo: 8,
    },
  ];

  return (
    <Container>
      <Box paddingY={4} sx={{ textAlign: "center" }}>
        <Typography paddingY={3} variant="h3" >
          Questions? Look Here.
          <Typography paddingY={1}>
            Maybe we have already answer your question, here's our FAQs.
          </Typography>
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Box flex={1}>
            <Box variant="image" maxWidth={"100%"}>
              <img src={faqs} alt="" srcset="" style={{ maxWidth: "100%" }} />
            </Box>
          </Box>
          <Box flex={3} paddingX={"30px"}>
            <List sx={{ maxHeight: "100%", overflow: "auto" }}>
              {questions.map((qna) => {
                return (
                  <ListItem>
                    <Accordion
                      bgcolor="primary"
                      onChange={handleChange(qna.qNo)}
                      expanded={expanded === qna.qNo}
                      key={qna.qNo}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography color={"primary"}>
                         {qna.qNo + "). "} {qna.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails textalign="start">
                        {qna.answer}
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Stack>
      </Box>
      <Box textalign={"center"} paddingBottom={5}textAlign={"center"}>
        <Typography variant="h6" >
          Didn't find your quesion above? Contact us at:
        </Typography>
        <Box sx={{ display: "flex", gap: "20px", justifyContent:"center", paddingTop:"20px" }}>
          <Typography>
            <Call /> +44 (0808) (911-9845)
          </Typography>
          <Typography>
            <Mail /> pennybankqueries24@gmail.com
          </Typography>
          <Typography>
            <WhatsApp /> +9198745-54125
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
