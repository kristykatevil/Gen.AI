import { PrimitiveType } from "@/lib/types";

export function pickPrimitive(prompt?: string | null, fileName?: string | null): PrimitiveType {
  const input = `${prompt ?? ""} ${fileName ?? ""}`.toLowerCase();
  if (/(medallion|coin|ring|bracelet|donut|wreath)/.test(input)) return "torus";
  if (/(vase|pillar|cup|basket|can|mug|bottle)/.test(input)) return "cylinder";
  if (/(tree|rocket|mountain|spire)/.test(input)) return "cone";
  if (/(planet|ball|orb|egg|bunny|head|face)/.test(input)) return "sphere";
  return "box";
}

export function primitiveLabel(kind: PrimitiveType): string {
  switch (kind) {
    case "box": return "Box";
    case "sphere": return "Sphere";
    case "cylinder": return "Cylinder";
    case "torus": return "Torus";
    case "cone": return "Cone";
  }
}

export function createAsciiCubeStl(name: string) {
  return `solid ${name}
  facet normal 0 0 1
    outer loop
      vertex 0 0 1
      vertex 1 0 1
      vertex 1 1 1
    endloop
  endfacet
  facet normal 0 0 1
    outer loop
      vertex 0 0 1
      vertex 1 1 1
      vertex 0 1 1
    endloop
  endfacet
  facet normal 0 0 -1
    outer loop
      vertex 0 0 0
      vertex 1 1 0
      vertex 1 0 0
    endloop
  endfacet
  facet normal 0 0 -1
    outer loop
      vertex 0 0 0
      vertex 0 1 0
      vertex 1 1 0
    endloop
  endfacet
  facet normal 0 1 0
    outer loop
      vertex 0 1 0
      vertex 0 1 1
      vertex 1 1 1
    endloop
  endfacet
  facet normal 0 1 0
    outer loop
      vertex 0 1 0
      vertex 1 1 1
      vertex 1 1 0
    endloop
  endfacet
  facet normal 0 -1 0
    outer loop
      vertex 0 0 0
      vertex 1 0 1
      vertex 0 0 1
    endloop
  endfacet
  facet normal 0 -1 0
    outer loop
      vertex 0 0 0
      vertex 1 0 0
      vertex 1 0 1
    endloop
  endfacet
  facet normal 1 0 0
    outer loop
      vertex 1 0 0
      vertex 1 1 1
      vertex 1 0 1
    endloop
  endfacet
  facet normal 1 0 0
    outer loop
      vertex 1 0 0
      vertex 1 1 0
      vertex 1 1 1
    endloop
  endfacet
  facet normal -1 0 0
    outer loop
      vertex 0 0 0
      vertex 0 0 1
      vertex 0 1 1
    endloop
  endfacet
  facet normal -1 0 0
    outer loop
      vertex 0 0 0
      vertex 0 1 1
      vertex 0 1 0
    endloop
  endfacet
endsolid ${name}
`;
}
