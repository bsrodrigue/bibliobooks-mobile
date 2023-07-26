class UserMissingProfileError extends Error {
    constructor() {
        super();
        this.message = "user does not have a user profile";
    }
}