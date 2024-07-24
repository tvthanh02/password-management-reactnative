const endpointApi = "https://mail-server-lzj6.onrender.com/api/v1";

export const sendEmail = async (
  receiveEmail: string | null | undefined,
  subject: string,
  text: string,
  html: string
) => {
  try {
    await fetch(endpointApi + "/send-email", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiveEmail,
        subject,
        text,
        html,
      }),
    });
  } catch (error) {
    throw error;
  }
};

export const checkConfirmEmail = async (code: string) => {
  try {
    const response = await fetch(
      `https://mail-server-lzj6.onrender.com/api/v1/check-status-confirm?code=${code}`
    );
    const data = await response.json();

    const { confirm }: any = data;

    // true or false
    return confirm;
  } catch (error) {
    throw error;
  }
};
