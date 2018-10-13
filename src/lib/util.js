/**	Creates a callback that proxies node callback style arguments to an Express Response object.
 *	@param {express.Response} res	Express HTTP Response
 *	@param {number} [status=200]	Status code to send on success
 *
 *	@example
 *		list(req, res) {
 *			collection.find({}, toRes(res));
 *		}
 */
export function toRes(res, status = 200) {
  return (err, thing) => {
    if (err) return res.status(500).send(err);

    if (thing && typeof thing.toObject === "function") {
      thing = thing.toObject();
    }
    res.status(status).json(thing);
  };
}

export const isInt = value => !isNaN(parseInt(value));

export const throwError = ({ error }) => {
  throw new Error(error);
};

export const functionWithRequiredParams = ({ fn, requiredParams }) => ({
  ...args
}) =>
  requiredParams.every(
    paramKey => args[paramKey] !== null && args[paramKey] !== undefined
  )
    ? fn({ ...args })
    : throwError({
        error:
          "parameter check failed, please ensure all required parameters are supplied to function"
      });
