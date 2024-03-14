# Database

<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href="#version-10">v1</a>
      <ul>
        <li><a href="#version-11">v1.1</a></li>
        <ul>
          <li><a href="#version-111">v1.11</a></li>
          <li><a href="#version-112">v1.12</a></li>
          <li><a href="#version-113">v1.13</a></li>
        </ul>
        <li><a href="#version-12">v1.2</a></li>
        <ul>
          <li><a href="#version-121">v1.21</a></li>
          <li><a href="#version-122">v1.22</a></li>
          <li><a href="#version-123">v1.23</a></li>
          <li><a href="#version-124">v1.24</a></li>
        </ul>
      </ul>
    </li>
  </ul>
</details>

## Current Database Schema

> _automatically-generated_ from Prisma Database Schema

<img src="./ERD.svg">

## Version 1.00

- init version as copied from the existed docs

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Version 1.10

### User

- `email` is set to not required
- `hashedPassword` is added as VarChar(512)
- `isGmail` is added as boolean with default as false

### Job

- Change the relation to `JobTag` to `Many-to-One`
- Change the FK reference from `userId` to `employerId`

### JobTag

- `title` is set to required

### Application

- `appliedAt` is removed, use `createdAt` instead
- `bid` is set to required

### Message

- `timestamp` is removed, use `createdAt` instead

### Transaction

- `employerId` is removed as we can use `jobId.employerId`

### Review

- `studentId` is added

### ApplicationStatus

- Add `ed` to enums

### Etc.

- `isDeleted` is added for the deletion in `User, Job, JobTag, Applied, Transaction, Review` for referential integrity contraint
- Change table name from `Applied` to `Application`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## v1.11

### User

- Change the FK format to `Student` and `Employer`

### Etc.

- Change the name convention of the relation name
- Refactor the seeding file to be `Student` and `Employer` based instead of `User` based
- Fix the `npx prisma generate`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# v1.12

### Job

- `description` is set to not required
- `descriptionUrl` is added and not required

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# v1.13

### Job

- `descriptionUrl` is deleted

### JobDocumentFile

- This table is added for storing multiple files in a single job

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# v1.20

### JobDocumentFile

- `fileUrl` is changed to `fileName`

### Application

- `isAcknowledged` is added and set default to false
- `documentUrl` is deleted as we use the serepate table (ApplicationDocumentFile) instead

### ApplicationDocumentFile

- This table is added for storing multiple files in a single application

### Transaction

- `paymentId` is deleted
- `receiptImageUrl` is changed to `receiptImageName` and set to required
- `employerUserId` is changed to `employerId` and set to required
- `paymentType` is deleted as we only have one type - promptpay qr
- `status` is added and set default to `PENDING`
- `amount` is added and set to not required

### ApplicationStatus

- edited as requested from backend team

### TransactionStatus

- consists of `PENDING`, `ACCEPTED`, and `REJECTED`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# v1.21

### Transaction

- `isDeposit` is added

### MailLog

- This table is added for keeping track of emails sended from the system

### ApplicationStatus

- `DISCLAIMED` is added
- `DELIVERED` is deleted

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# v1.22

### ApplicationStatus

- `DELIVERED` is added back due to the code dependency, maybe revert back later

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# v1.23

### TransactionDetail

- This table is added and it will be served for storing transaction details in the case where that transaction is successfully verified by api

<p align="right">(<a href="#readme-top">back to top</a>)</ p>

# v1.24

### TransactionDetail

- `receiverAccountType` is deleted as the api response contains only an empty string
- `receiverAccountValue` is deleted as the api response contains only an empty string
- Add mapping to `transaction_detail`

### MailLog

- Add mapping to `mail_log`

<p align="right">(<a href="#readme-top">back to top</a>)</ p>
