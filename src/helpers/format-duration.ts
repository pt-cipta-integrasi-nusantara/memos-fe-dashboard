export function formatDuration(timeString: string): string {
    const parts: string[] = timeString.split(" ");
    const result: string[] = [];

    for (let i = 0; i < parts.length; i += 2) {
      const value: number = parseFloat(parts[i]);
      const unit: string = parts[i + 1];

      if (value !== 0) {
        result.push(`${value} ${unit}`);
      }
    }

    return result.length > 0 ? result.join(" ") : "0 secs"; // Default to "0 secs" if all values are 0
  }