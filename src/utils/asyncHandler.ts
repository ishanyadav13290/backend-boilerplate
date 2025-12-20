import { Request, Response, NextFunction } from "express";

type RequestWithUser = Request & { [key: string]: any };

export const asyncHandler = (
  fn: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(async (error) => {
      try {
        // Dynamically import stack-trace
        const stackTrace = (await import("stack-trace")).default;

        // Parse the error stack trace
        const trace = stackTrace.parse(error);
        const firstFrame = trace[0];
        const { fileName, lineNumber, columnNumber } = firstFrame ? {
            fileName: firstFrame.getFileName(),
            lineNumber: firstFrame.getLineNumber(),
            columnNumber: firstFrame.getColumnNumber()
        } : {};

        // Log the error details, including file name, line number, column number
        console.error({
          message: error.message,
          stack: error.stack,
          fileName,
          lineNumber,
          columnNumber,
        });
      } catch (err) {
        // If parsing the stack trace fails, log the error directly
        console.error({
          message: "Failed to capture stack trace",
          error: err,
        });
      }

      // Pass the error to the Express error handler
      next(error);
    });
  };
};
