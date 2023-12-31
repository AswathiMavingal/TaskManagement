export class User {
  constructor(
    public name: string,
    public email: string,
    public role: string,
    public password?: string,
    public passwordConfirm?: string,
    private token?: string,
    private tokenExpirationDate?: Date
  ) {}
  get _token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.token;
  }
}
