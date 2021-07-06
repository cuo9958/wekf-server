import NJwt from "njwt";

const jwt_key = "123";

export function CreateJwtToken(data: any) {
    const jwt = NJwt.create(data, jwt_key);
    return jwt.compact();
}

export function ParseJwtToken(token: string) {
    const data = NJwt.verify(token, jwt_key);
    if (!data) return null;
    return data.body;
}
