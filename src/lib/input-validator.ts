export class InputValidator {
  static validEmail(email: string): boolean | string {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email) || "invalid e-mail format";
  }
  static required(value: string): boolean | string {
    return !!value || "required";
  }

  static min(value: string, length: number): boolean | string {
    return value.length >= length || `min ${length} characters`;
  }
}
