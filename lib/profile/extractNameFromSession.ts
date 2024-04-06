export function getNameFromSession(session : any) {
    let name;
    // If authenticated via google
    if (session?.user.name) {
        name = session.user.name;
    } else {
      // If authenticated via email and password
      name =
        session?.user.salutation +
        session?.user.firstname +
        " " +
        session?.user.lastname;
    }
    return name;
}
