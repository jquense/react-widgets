
export default function getId(prefix, prop) {
  return `/${prefix}${prop.replace(' ', '_')}`
}
