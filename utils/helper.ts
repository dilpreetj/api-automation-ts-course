import adminController from "../controller/admin.controller";

export const login = async (email: string, password: string) => {
  const body = { "email": email, "password": password }
  const res = await adminController.postAdminLogin(body);
  return res.body.token;
}