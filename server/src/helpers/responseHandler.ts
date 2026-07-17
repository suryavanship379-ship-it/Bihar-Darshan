export const sendSuccess = <T>(res: any, statusCode: number, message: string, data?: T) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data: data || {},
  });
};
