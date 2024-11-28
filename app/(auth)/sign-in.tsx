import { useSignIn } from '@clerk/clerk-expo';
import CustomButton from 'components/CustomButton';
import InputField from 'components/InputField';
import OAuth from 'components/OAuth';
import { icons } from 'constants';
import { images } from 'constants';
import { Link, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="w-fullh-[250px] relative">
          <Image source={images.signUpCar} className="z-0 h-[250px] w-full" />
          <Text className="absolute bottom-5 left-5 font-JakartaSemiBold text-2xl text-black">
            Welcome
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            labelStyle="text-black"
            onChangeText={(value) => setForm({ ...form, email: value })}
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
          />
          <InputField
            label="Password"
            labelStyle="text-black"
            onChangeText={(value) => setForm({ ...form, password: value })}
            placeholder="Enter your password"
            secureTextEntry={true}
            icon={icons.lock}
            value={form.password}
          />

          <CustomButton title="Sign In" onPress={onSignInPress} className="mt-6" />

          <OAuth />

          <Link href="/sign-up" className="mt-10 text-center text-lg text-general-200">
            <Text>Don't have an Account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
