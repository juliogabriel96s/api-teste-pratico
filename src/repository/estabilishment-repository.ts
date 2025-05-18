import {Establishment} from '@/db/entity/estabilishment'
export interface EstabilishmentRepository{
    create(establishment: Establishment):Promise<Establishment>
    findByType(type: string):Promise<Establishment | null>
    findById(id: string):Promise<Establishment | null>
    save(estabilishmentId: Establishment): Promise<Establishment>
    delete(id: string): Promise<void>
    findAll(): Promise<Establishment[]>
}