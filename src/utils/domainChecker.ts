export const checkDomain = async (name: string, extension: string): Promise<boolean | null> => {
  try {
    const response = await fetch(
      `https://api.domainsdb.info/v1/domains/search?domain=${name.toLowerCase()}${extension}`,
      { signal: AbortSignal.timeout(5000) }
    );
    const data = await response.json();
    return data.domains?.length === 0;
  } catch (error) {
    console.error(`Erreur vérification ${extension}:`, error);
    return null;
  }
};

export const checkAllDomains = async (name: string) => {
  const extensions = ['.com', '.io', '.ai', '.app', '.co'];
  const results: Record<string, boolean | null> = {};

  await Promise.all(
    extensions.map(async (ext) => {
      results[ext] = await checkDomain(name, ext);
    })
  );

  return results;
};
