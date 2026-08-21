import { IDobAndAgeValidator } from "../../application/interfaces/IDobAndAgeValidator.interface";

export class DobAndAgeValidator implements IDobAndAgeValidator {
  validate(date_of_birth: string, age: number): boolean {
    if (isNaN(Number(age))) return false;
    const today = new Date();
    const birthDate = new Date(date_of_birth);

    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }
    if (age < 13) return false;
    if (age !== calculatedAge) return false;

    return true
  }
}
