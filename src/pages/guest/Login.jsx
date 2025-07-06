import { useState } from 'react';
import {
  Card, Input, Button, CardBody, CardHeader, Typography
} from '@material-tailwind/react';
import { CpuChipIcon } from '@heroicons/react/24/solid';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) return setError(error.message);
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
      <Card shadow={false} className="w-full max-w-xl border border-gray-300 py-8 md:py-14 md:px-16">
        <CardHeader shadow={false} floated={false} className="text-center">
          <Typography variant="h1" color="blue-gray" className="mb-4 !text-3xl lg:text-4xl">
            Login
          </Typography>
          <Typography className="text-[18px] font-normal !text-gray-600 md:max-w-sm mx-auto">
            Enjoy quick and secure access to your accounts on EduPro Learning Platform.
          </Typography>
        </CardHeader>

        <CardBody>
          <form className="flex flex-col gap-4 md:mt-12" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email">
                <Typography variant="small" color="blue-gray" className="mb-2 block font-medium">
                  Your Email
                </Typography>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@mail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{ className: 'hidden' }}
              />
            </div>
            <div>
              <label htmlFor="password">
                <Typography variant="small" color="blue-gray" className="mb-2 block font-medium">
                  Password
                </Typography>
              </label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{ className: 'hidden' }}
              />
            </div>

            {error && <Typography className="text-sm text-red-500">{error}</Typography>}

            <Button size="lg" color="gray" type="submit" fullWidth>
              Continue
            </Button>

            <Button variant="outlined" size="lg" fullWidth className="flex h-12 items-center justify-center gap-2 border-blue-gray-200">
              <img src="https://www.material-tailwind.com/logos/logo-google.png" alt="google" className="h-6 w-6" />
              Sign in with Google
            </Button>

            <Button variant="outlined" size="lg" fullWidth className="flex h-12 items-center justify-center gap-2 border-blue-gray-200">
              <CpuChipIcon className="h-6 w-6" />
              Wallet Authentication
            </Button>

            <Typography variant="small" className="mx-auto max-w-[19rem] text-center !font-medium !text-gray-600">
              By signing in, you agree to our{' '}
              <a href="#" className="text-gray-900">Terms</a> &{' '}
              <a href="#" className="text-gray-900">Privacy Policy</a>.
            </Typography>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
