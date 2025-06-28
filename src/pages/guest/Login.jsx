import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography
} from '@material-tailwind/react';

// @icons
import { CpuChipIcon } from '@heroicons/react/24/solid';

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
      <Card
        shadow={false}
        className="w-full max-w-xl border border-gray-300 py-8 md:py-14 md:px-16"
      >
        <CardHeader shadow={false} floated={false} className="text-center">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 !text-3xl lg:text-4xl"
          >
            Login 
          </Typography>
          <Typography className="text-[18px] font-normal !text-gray-600 md:max-w-sm mx-auto">
            Enjoy quick and secure access to your accounts on various EduPro Learning Platforms.
          </Typography>
        </CardHeader>

        <CardBody>
          <form action="#" className="flex flex-col gap-4 md:mt-12">
            <div>
              <label htmlFor="email">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 block font-medium"
                >
                  Your Email
                </Typography>
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@mail.com"
                color="gray"
                size="lg"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{
                  className: 'hidden',
                }}
              />
            </div>

            <Button size="lg" color="gray" fullWidth>
              continue
            </Button>

            <Button
              variant="outlined"
              size="lg"
              fullWidth
              className="flex h-12 items-center justify-center gap-2 border-blue-gray-200"
            >
              <img
                src="https://www.material-tailwind.com/logos/logo-google.png"
                alt="google"
                className="h-6 w-6"
              />
              sign in with google
            </Button>

            <Button
              variant="outlined"
              size="lg"
              fullWidth
              className="flex h-12 items-center justify-center gap-2 border-blue-gray-200"
            >
              <CpuChipIcon className="h-6 w-6" />
              Wallet Authentication
            </Button>

            <Typography
              variant="small"
              className="mx-auto max-w-[19rem] text-center !font-medium !text-gray-600"
            >
              Upon signing in, you consent to abide by our{' '}
              <a href="#" className="text-gray-900">
                Terms of Service
              </a>{' '}
              &{' '}
              <a href="#" className="text-gray-900">
                Privacy Policy.
              </a>
            </Typography>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
