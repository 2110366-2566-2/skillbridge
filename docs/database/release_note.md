# Database
<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href="#version-1.0">v1.0</a>
      <ul>
        <li><a href="#version-1.1">v1.1</a></li>
      </ul>
    </li>
  </ul>
</details>

## Version 1.0
- init version as copied from the existed docs

## Version 1.1
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
