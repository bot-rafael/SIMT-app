import { useState } from 'react';
import {
  Card, Input, Checkbox, Button, Typography, CardBody, CardHeader
} from '@material-tailwind/react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { name: form.name }
      }
    });

    if (error) return setError(error.message);

    const user = data.user;

    // Insert data ke tabel profiles
    if (user) {
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          user_id: user.id,
          full_name: form.name,
          username: form.email.split('@')[0], // username default dari email
          role: 'Pelajar',
        }
      ]);

      if (profileError) {
        console.error(profileError);
        return setError('Registrasi berhasil, tetapi gagal menyimpan data profil.');
      }
    }

    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
      <Card shadow={false} className="w-full max-w-xl border border-gray-300 py-2 md:py-4 md:px-16 bg-white">
        <CardHeader shadow={false} floated={false} className="text-center">
          <Typography variant="h1" color="blue-gray" className="mb-4 !text-3xl lg:text-4xl">
            Sign Up
          </Typography>
          <Typography className="text-[18px] font-normal !text-gray-600 md:max-w-sm mx-auto">
            Nice to meet you! Enter your details to register.
          </Typography>
        </CardHeader>

        <CardBody>
          <form className="flex flex-col gap-6 mt-6" onSubmit={handleRegister}>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 block font-medium">
                Your Name
              </Typography>
              <Input
                id="name"
                size="lg"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{ className: 'hidden' }}
              />
            </div>

            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 block font-medium">
                Your Email
              </Typography>
              <Input
                id="email"
                size="lg"
                placeholder="name@mail.com"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{ className: 'hidden' }}
              />
            </div>

            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 block font-medium">
                Password
              </Typography>
              <Input
                id="password"
                size="lg"
                type="password"
                placeholder="********"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{ className: 'hidden' }}
              />
            </div>

            <Checkbox
              label={
                <Typography variant="small" color="gray" className="flex items-center font-normal">
                  I agree to the
                  <a href="#" className="font-medium text-gray-900">&nbsp;Terms and Conditions</a>
                </Typography>
              }
              containerProps={{ className: '-ml-2.5' }}
            />

            {error && <Typography className="text-sm text-red-500">{error}</Typography>}

            <Button className="mt-2" fullWidth type="submit">
              Sign up
            </Button>

            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-gray-900">
                Sign In
              </a>
            </Typography>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
