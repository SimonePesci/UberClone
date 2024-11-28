import { icons } from 'constants';
import { formatDate, formatTime } from 'lib/util';
import { Image, Text, View } from 'react-native';
import { Ride } from 'types/type';

const RideCard = ({
  ride: {
    destination_longitude,
    destination_latitude,
    origin_address,
    destination_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  },
}: {
  ride: Ride;
}) => {
  console.log(destination_longitude, destination_latitude);

  return (
    <View className="mb-3 flex flex-row items-center justify-center rounded-lg bg-white shadow-sm shadow-neutral-300">
      <View className="flex flex-col items-center justify-between p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="h-[90px] w-[80px] rounded-lg"
          />

          <View className="mx-5 flex flex-1 flex-col gap-y-5">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="h-5 w-5" />
              <Text className="text-md font-Jakarta" numberOfLines={1}>
                {origin_address}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="h-5 w-5" />
              <Text className="text-md font-Jakarta" numberOfLines={1}>
                {destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-5 flex w-full flex-col items-start justify-center rounded-lg bg-general-500 p-3">
          <View className="mb-5 flex w-full flex-row items-center justify-between">
            <Text>Date & Time</Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {formatDate(created_at)}, {formatTime(ride_time)}
            </Text>
          </View>
          <View className="mb-5 flex w-full flex-row items-center justify-between">
            <Text>Driver</Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {driver.first_name} {driver.last_name}
            </Text>
          </View>
          <View className="mb-5 flex w-full flex-row items-center justify-between">
            <Text>Car Seats</Text>
            <Text className="text-md font-JakartaMedium text-gray-500">{driver.car_seats}</Text>
          </View>
          <View className="mb-5 flex w-full flex-row items-center justify-between">
            <Text>Payment Status</Text>
            <Text
              className={`text-md font-JakartaMedium capitalize  ${payment_status === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
              {payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;

// https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:83.985567,28.209583&zoom=14&apiKey=377670046d25459c9e560eea2a2e2ec2
