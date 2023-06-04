export interface DAO{
    name: string,
    img: string,
    address: string,
    onClick: React.MouseEventHandler<HTMLElement>
}

export interface Proposal{
    name: string,
    description: string,
    address: string,
    status: string
    votes:{yes:number,no:number,abstain:number}
    onClick: React.MouseEventHandler<HTMLElement>
}