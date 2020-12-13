
  export const toJSON = (res: Response) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  };

  export const logError = (err: Response) => {
    err.text().then((text: string) => { console.error(text); });
  };