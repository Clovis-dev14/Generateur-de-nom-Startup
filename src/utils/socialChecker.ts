export const checkSocial = async (name: string, platform: string): Promise<boolean> => {
  const urls: Record<string, string> = {
    twitter: `https://twitter.com/${name}`,
    instagram: `https://instagram.com/${name}`,
    facebook: `https://facebook.com/${name}`,
    linkedin: `https://linkedin.com/company/${name}`
  };

  try {
    const response = await fetch(urls[platform], {
      method: 'HEAD',
      mode: 'no-cors',
      signal: AbortSignal.timeout(3000)
    });
    return response.type === 'opaque';
  } catch {
    return true;
  }
};

export const checkAllSocials = async (name: string) => {
  const platforms = ['twitter', 'instagram', 'facebook', 'linkedin'];
  const results: Record<string, boolean> = {};

  await Promise.all(
    platforms.map(async (platform) => {
      results[platform] = await checkSocial(name, platform);
    })
  );

  return results;
};
