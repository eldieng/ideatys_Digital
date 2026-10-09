const CONSTRUCTION_HOSTS = new Set([
  "ideatysdigital.com",
  "www.ideatysdigital.com",
]);

export function hostnameFromHost(host: string | null | undefined) {
  return (host ?? "").split(":")[0].trim().toLowerCase();
}

export function isConstructionHost(host: string | null | undefined) {
  return CONSTRUCTION_HOSTS.has(hostnameFromHost(host));
}
