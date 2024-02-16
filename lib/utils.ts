import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function customTrim(inputString: string): string {
  // Regular expression to remove leading and trailing whitespaces
  const trimRegex = /^\s+|\s+$/g

  // Use replace method with the regex to trim the string
  const trimmedString = inputString.replace(trimRegex, "")

  return trimmedString
}

export function splitSalutation(input: string): [string, string] {
  const salutationRegex = /^(Mr\.|Mrs\.|Ms\.|Miss|Dr\.|คุณ|นาย|นางสาว|นาง)/i
  const match = input.match(salutationRegex)

  if (match) {
    const salutation = match[0].trim()
    const name = input.slice(match[0].length).trim()
    return [salutation, name]
  }

  return ["-", input.trim()]
}
