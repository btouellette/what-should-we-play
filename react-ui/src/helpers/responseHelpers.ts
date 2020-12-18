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
  if (err.text) {
    err.text().then((text: string) => { console.error(text); });
  } else {
    console.error(JSON.stringify(err));
    return err;
  }
};