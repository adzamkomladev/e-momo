import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const komla = await prisma.user.upsert({
        where: { email: 'komla@yopmail.com' },
        update: {},
        create: {
            email: 'komla@yopmail.com',
            keys: {
                create: [
                    {
                        env: 'DEV',
                        key: 'Om1X2vsDYJ7pZv3bludacGfJ60Sf9Ozu'
                    }
                ],
            },
        },
    })
    const valentine = await prisma.user.upsert({
        where: { email: 'valentine@yopmail.com' },
        update: {},
        create: {
            email: 'valentine@yopmail.com',
            keys: {
                create: [
                    {
                        env: 'DEV',
                        key: 'xZ1yEwsduW6D7RwIPeMl8mHWNNUpwuSC'
                    }
                ],
            },
        },
    })
    console.log({ komla, valentine })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })