# Database

<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href="#version-10">v1.0</a>
      <ul>
        <li><a href="#version-11">v1.1</a></li>
        <ul>
          <li><a href="#version-111">v1.11</a></li>
          <li><a href="#version-112">v1.12</a></li>
          <li><a href="#version-113">v1.13</a></li>
        </ul>
      </ul>
    </li>
  </ul>
</details>

## Version 1.00

- init version as copied from the existed docs

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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
