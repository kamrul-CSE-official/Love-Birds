const envConfig = {
  API: {
    PRIMARY_API: process.env.NEXT_PUBLIC_PUBLIC_API_KEY as string,
    SECONDARY_API: process.env.NEXT_PUBLIC_SECONDARY_API_KEY as string,
  },
};
export default envConfig;
