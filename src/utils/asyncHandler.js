/*
// TRY CATCH 
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        // sends status and a error message
        res.status(err.code || 500).json({
            sucess: false,
            message: err.message
        })
    }
}
*/

// PROMISE
/*
The asyncHandler function is a higher-order function

Input: It takes a requestHandler function, which is presumably 
an asynchronous middleware function used in an Express route.
Output: It returns another function that wraps the requestHandler.
Wrapping: The returned function does the following:
It calls the requestHandler function, passing it the req, res, and next objects (standard Express middleware parameters).
It wraps the call to requestHandler within Promise.resolve(...). This ensures that even if requestHandler doesn't explicitly return a Promise, any errors thrown within it will be caught by the subsequent .catch() block.
If requestHandler (or any asynchronous code within it) throws an error or rejects a promise, the .catch() block is triggered.
The .catch() block calls next(err), which passes the error to the next error-handling middleware in your Express app.
*/
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
}

export { asyncHandler };