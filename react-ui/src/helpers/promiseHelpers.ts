
  export const responseToJSON = (res: Response) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  };

  export const responseToText = (res: Response) => {
    if (!res.ok) {
      throw res;
    }
    return res.text();
  };

  export const logError = (err: Response) => {
    err.text().then((text: string) => { console.error(text); });
  };