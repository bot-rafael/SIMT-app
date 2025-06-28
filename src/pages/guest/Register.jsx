import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardBody,
  CardHeader
} from '@material-tailwind/react';

export default function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
      <Card
        shadow={false}
        className="w-full max-w-xl border border-gray-300 py-2 md:py-4 md:px-16 bg-white"
      >
        <CardHeader shadow={false} floated={false} className="text-center">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 !text-3xl lg:text-4xl"
          >
            Sign Up
          </Typography>
          <Typography className="text-[18px] font-normal !text-gray-600 md:max-w-sm mx-auto">
            Nice to meet you! Enter your details to register.
          </Typography>
        </CardHeader>

        <CardBody>
          <form className="flex flex-col gap-6 mt-6">
            <div>
              <label htmlFor="name">
                <Typography variant="small" color="blue-gray" className="mb-2 block font-medium">
                  Your Name
                </Typography>
              </label>
              <Input
                id="name"
                size="lg"
                placeholder="your name"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{
                  className: 'hidden',
                }}
              />
            </div>

            <div>
              <label htmlFor="email">
                <Typography variant="small" color="blue-gray" className="mb-2 block font-medium">
                  Your Email
                </Typography>
              </label>
              <Input
                id="email"
                size="lg"
                type="email"
                placeholder="name@mail.com"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{
                  className: 'hidden',
                }}
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
                size="lg"
                placeholder="********"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{
                  className: 'hidden',
                }}
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

            <Button className="mt-2" fullWidth>
              sign up
            </Button>

            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{' '}
              <a href="#" className="font-medium text-gray-900">
                Sign In
              </a>
            </Typography>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
