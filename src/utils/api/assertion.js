import { stringifyQs } from "../querystring.js";
import { request } from "./request.js";

export async function searchAssertions(params) {
  const res = await request.get(`/api/assertions/?${stringifyQs(params)}`);
  return res;
}

// export async function getRandomAssertion() {
//   const res = await request.get('/api/assertions');
// }

// export async function getAssertion(id) {
//   const res = await request.get('/api/assertions/' + id);
// }

/** 未写之接口
 *  api/sheets
 *    GET
 *    POST
 * 
 * 
 *  api/judge_
 *    GET
 *      ?assertion_id={assertion_id}
 *    POST
 * 
 * 
 *  api/slot_questions
 *    GET
 *    POST
 * 
 */