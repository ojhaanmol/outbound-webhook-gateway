export type Username= string;
export type Password= string;
export type ListnerUrl= string;
export type ServiceName= string;
export type PingResponse= boolean;
export type AuthTokenRecived= string;
export type GetPasswordByUserName= (username: Username)=>Promise<Password>;
export type CheckHeartBeat= (url: ListnerUrl)=>Promise<PingResponse>;
export type RegisterUrl= (url: ListnerUrl, serviceName: ServiceName)=>Promise<void>;
export type RegisterListnerUrlInboundPort= {
    getPasswordByUserName: GetPasswordByUserName;
    checkHeartBeat: CheckHeartBeat;
    registerUrl: RegisterUrl;
}
