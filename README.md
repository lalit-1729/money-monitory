# Money-Monitory

**Money-Monitory** is a dummy platform developed for customers to encourage savings by rounding up debit card transactions to the nearest pound and crediting the difference to a savings account. The platform is designed to make saving effortless and intuitive, with additional functionalities for customer engagement and transaction management.

---

## Features

- **Customer Registration**: Secure and straightforward onboarding process.
- **Account Linking**: Customers can link their debit card and savings accounts.
- **Transaction Management**: 
  - Real-time rounding up of transactions.
  - Automated crediting to a savings account.
- **OTP Verification**: Ensures security during sensitive operations using Twilio.
- **Chatbot Support**: An AI-powered assistant to help users with common queries.
- **Microservices Architecture**:
  - **API Gateway**: JWT-based authentication.
  - **Service Discovery**: Netflix Eureka integration for seamless service communication.

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Spring Boot (Java)
- **Database**: MySQL
- **Microservices**: Spring Cloud
- **Containerization**: Docker
- **CI/CD**: GitLab CI/CD
- **Messaging**: Twilio for OTP verification
- **Authentication**: JWT-based API Gateway

---

## Setup and Installation

### Prerequisites
- [Java 11+](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

### Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/money-monitory.git
   cd money-monitory
