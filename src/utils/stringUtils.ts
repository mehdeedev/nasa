export function convertDate(date: string) {
    const dateModel = new Date(date);
    return dateModel.toLocaleString([], {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    }