import db from '@/lib/db/db';
import { executeAction } from '@/lib/executeAction';
import { signupschema } from '@/types';

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const name = formData.get('name');
      const email = formData.get('email');
      const password = formData.get('password');
      const confirmPassword = formData.get('confirmPassword');
      const validatedData = signupschema.parse({
        email,
        password,
        name,
        confirmPassword,
      });
      await db.user.create({
        data: {
          name: validatedData.name.toLocaleLowerCase(),
          email: validatedData.email.toLocaleLowerCase(),
          password: validatedData.password,
        },
      });
    },
    successMessage: 'Signed up successfully',
  });
};

export { signUp };
