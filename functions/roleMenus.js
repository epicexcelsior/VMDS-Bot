const { roleData, logChannelId, roleLogging } = require('../config.js');
const validSelectMenuIds = [];
for (let i in roleData) {
	validSelectMenuIds.push(roleData[i].button.customId + '-SelectMenu')
};

async function createRoleMenu (interaction) {
    const logChannel = await interaction.guild.channels.fetch(logChannelId);

    if (!(validSelectMenuIds.includes(interaction.customId))) return;
		
    await interaction.deferUpdate();

    // Puts all possible choices of select menu (using same options that went into creating select menu) into an array
    // ASSUMES that the select menu has the exact same options that were added earlier using the category button
    try {
        const valueOptions = [];
        for (let i in selectMenuOptions) {
            valueOptions.push(selectMenuOptions[i].value)
        };

        let addList = [];
        let removeList = [];

        // Logic to add/remove roles
        // If they don't have the role and selected it, add the role; if they have the role and didn't select it, remove the role
        for (let item in valueOptions) {
            const roleId = valueOptions[item]
            const role = interaction.guild.roles.cache.get(roleId);
            const memberRoles = interaction.member.roles;
            const hasRole = memberRoles.cache.has(roleId)

            if ((hasRole) && !(interaction.values.includes(roleId))) {
                await memberRoles.remove(roleId)
                    .then(() => {
                        removeList.push(role.name)
                        console.log('Removed', role.name, "role from", interaction.user.tag)
                    })
                    .catch((error) => {
                        console.error(error)
                        logChannel.send(`<@295227446981033984> An error occurred.\n\`\`\`\n${error}\`\`\``)
                    });
            } else if (!(hasRole) && (interaction.values.includes(roleId))) {
                await memberRoles.add(roleId)
                    .then(() => {
                        addList.push(role.name)
                        console.log('Added', role.name, "role to", interaction.user.tag)
                    })
                    .catch((error) => {
                        console.error(error);
                        logChannel.send(`<@295227446981033984> An error occurred.\n\`\`\`\n${error}\`\`\``);
                    });
            };
        };
        if (roleLogging) {
            if (addList.length === 0) { addList = ['none'] };
            if (removeList.length === 0) { removeList = ['none'] };
            await logChannel.send(`**Updated roles for ${interaction.user.tag} (\`${interaction.user.id}\`) through role manager:**\n<:add:1004649196533600326> Added ${addList.join(', ')}\n<:remove:1004641620253229108> Removed ${removeList.join(', ')}`);
        };
    } catch (error) {
        console.error(error);
        await logChannel.send(`<@295227446981033984> An error occurred.\n\`\`\`\n${error}\`\`\``);
    };	
};

module.exports = {createRoleMenu}