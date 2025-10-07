// 队伍数据
let teams = [
    { id: 1, name: "猛虎队", color: "#dc3545", members: [] },
    { id: 2, name: "飞鹰队", color: "#0d6efd", members: [] },
    { id: 3, name: "巨龙队", color: "#198754", members: [] },
    { id: 4, name: "猎豹队", color: "#fd7e14", members: [] },
    { id: 5, name: "雄狮队", color: "#6f42c1", members: [] },
    { id: 6, name: "战狼队", color: "#20c997", members: [] },
    { id: 7, name: "凤凰队", color: "#e83e8c", members: [] }
];

// 选手数据 - 按位置分类
let playersByPosition = {
    "上单": [
        { id: 1, name: "霸天剑魔", position: "上单" },
        { id: 2, name: "无双剑姬", position: "上单" },
        { id: 3, name: "荒漠屠夫", position: "上单" },
        { id: 4, name: "德玛西亚", position: "上单" },
        { id: 5, name: "暗裔剑魔", position: "上单" },
        { id: 6, name: "海洋之灾", position: "上单" }
    ],
    "打野": [
        { id: 7, name: "盲僧李青", position: "打野" },
        { id: 8, name: "德邦总管", position: "打野" },
        { id: 9, name: "虚空女皇", position: "打野" },
        { id: 10, name: "痛苦之拥", position: "打野" },
        { id: 11, name: "永猎双子", position: "打野" },
        { id: 12, name: "狂野女猎", position: "打野" }
    ],
    "中单": [
        { id: 13, name: "疾风剑豪", position: "中单" },
        { id: 14, name: "影流之主", position: "中单" },
        { id: 15, name: "九尾妖狐", position: "中单" },
        { id: 16, name: "卡牌大师", position: "中单" },
        { id: 17, name: "发条魔灵", position: "中单" },
        { id: 18, name: "时间刺客", position: "中单" }
    ],
    "射手": [
        { id: 19, name: "探险家EZ", position: "射手" },
        { id: 20, name: "暗夜猎手", position: "射手" },
        { id: 21, name: "皮城女警", position: "射手" },
        { id: 22, name: "惩戒之箭", position: "射手" },
        { id: 23, name: "暴走萝莉", position: "射手" },
        { id: 24, name: "圣枪游侠", position: "射手" }
    ],
    "辅助": [
        { id: 25, name: "魂锁典狱长", position: "辅助" },
        { id: 26, name: "风暴之怒", position: "辅助" },
        { id: 27, name: "仙灵女巫", position: "辅助" },
        { id: 28, name: "蒸汽机器人", position: "辅助" },
        { id: 29, name: "唤潮鲛姬", position: "辅助" },
        { id: 30, name: "弗雷尔卓德", position: "辅助" }
    ]
};

// 位置颜色映射
const positionColors = {
    "上单": "position-top",
    "打野": "position-jungle", 
    "中单": "position-mid",
    "射手": "position-adc",
    "辅助": "position-support"
};

let nextPlayerId = 31;
let nextTeamId = 8;

// 检查选手是否已经在某个队伍中
function isPlayerInAnyTeam(playerId) {
    return teams.some(team => 
        team.members.some(member => member.id === playerId)
    );
}

// 检查选手名称是否已经在其他队伍中使用
function isPlayerNameInOtherTeam(playerName, currentTeamId) {
    return teams.some(team => 
        team.id !== currentTeamId && 
        team.members.some(member => member.name === playerName)
    );
}

// 渲染队伍
function renderTeams() {
    const teamsContainer = document.getElementById('teamsContainer');
    teamsContainer.innerHTML = '';
    
    teams.forEach(team => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.dataset.teamId = team.id;
        
        // 生成队员列表HTML
        let membersHTML = '';
        for (let i = 0; i < 5; i++) {
            if (team.members[i]) {
                const member = team.members[i];
                const isCaptain = i === 0;
                const positionClass = positionColors[member.position];
                membersHTML += `
                    <div class="member-item" data-member-index="${i}">
                        <div class="member-header">
                            <div class="player-name-container">
                                <span class="player-name-static">${member.name}</span>
                            </div>
                            <div class="member-actions">
                                <button class="btn btn-outline-danger btn-xs" onclick="removeFromTeam(${team.id}, ${i})">移除</button>
                            </div>
                        </div>
                        <div class="position-and-captain">
                            <span class="position-tag ${positionClass}">${member.position}</span>
                            ${isCaptain ? '<span class="captain-badge">队长</span>' : ''}
                        </div>
                    </div>
                `;
            } else {
                membersHTML += `<div class="member-item empty-slot">空位</div>`;
            }
        }
        
        teamCard.innerHTML = `
            <div class="team-header">
                <div class="team-info">
                    <div class="team-number" style="background-color: ${team.color}">${team.id}</div>
                    <span class="team-name" contenteditable="true" onblur="updateTeamName(${team.id}, this.textContent)">${team.name}</span>
                    <small class="text-muted">(${team.members.length}/5)</small>
                </div>
                <div class="team-actions">
                    <button class="btn btn-outline-danger btn-xs" onclick="removeTeam(${team.id})">移除</button>
                </div>
            </div>
            <div class="team-members">
                ${membersHTML}
            </div>
        `;
        teamsContainer.appendChild(teamCard);
    });
    
    // 重新绑定拖拽事件
    bindDragEvents();
}

// 渲染选手池
function renderPlayerPool() {
    const positionsContainer = document.getElementById('positionsContainer');
    positionsContainer.innerHTML = '';
    
    Object.entries(playersByPosition).forEach(([position, players]) => {
        const positionColumn = document.createElement('div');
        positionColumn.className = 'position-column';
        
        let playersHTML = '';
        players.forEach(player => {
            const colorClass = positionColors[position];
            playersHTML += `
                <div class="player-item" 
                     draggable="true" 
                     data-player-id="${player.id}" 
                     data-player-name="${player.name}" 
                     data-player-position="${player.position}">
                    <div class="player-header">
                        <div class="player-name">${player.name}</div>
                        <div class="player-actions">
                            <button class="btn btn-outline-primary btn-xs" onclick="editPlayer('${position}', ${player.id})">修改</button>
                            <button class="btn btn-outline-danger btn-xs" onclick="removePlayer('${position}', ${player.id})">移除</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        const colorClass = positionColors[position];
        positionColumn.innerHTML = `
            <div class="position-title ${colorClass}">${position} (${players.length}名)</div>
            <div class="position-players">
                ${playersHTML}
            </div>
            <button class="btn btn-outline-success add-player-btn" onclick="addNewPlayer('${position}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-plus me-1" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                添加选手
            </button>
        `;
        positionsContainer.appendChild(positionColumn);
    });
    
    // 绑定选手拖拽事件
    bindPlayerDragEvents();
}

// 添加新队伍
function addNewTeam() {
    const teamColors = ["#dc3545", "#0d6efd", "#198754", "#fd7e14", "#6f42c1", "#20c997", "#e83e8c", "#6c757d", "#17a2b8", "#ffc107"];
    const newTeam = {
        id: nextTeamId++,
        name: `新队伍${teams.length + 1}`,
        color: teamColors[teams.length % teamColors.length],
        members: []
    };
    teams.push(newTeam);
    renderTeams();
}

// 移除队伍
function removeTeam(teamId) {
    if (teams.length <= 1) {
        alert('至少需要保留一支队伍！');
        return;
    }
    
    if (confirm('确定要移除这支队伍吗？队伍中的所有选手将回到选手池。')) {
        const teamIndex = teams.findIndex(t => t.id === teamId);
        if (teamIndex !== -1) {
            // 将队伍中的选手放回选手池
            const team = teams[teamIndex];
            team.members.forEach(member => {
                if (playersByPosition[member.position]) {
                    playersByPosition[member.position].push(member);
                }
            });
            
            teams.splice(teamIndex, 1);
            renderTeams();
            renderPlayerPool();
        }
    }
}

// 一键清空所有队伍
function clearAllTeams() {
    if (confirm('确定要清空所有队伍的选手吗？所有选手将回到选手池。')) {
        teams.forEach(team => {
            // 将队伍中的选手放回选手池
            team.members.forEach(member => {
                if (playersByPosition[member.position]) {
                    playersByPosition[member.position].push(member);
                }
            });
            team.members = [];
        });
        renderTeams();
        renderPlayerPool();
    }
}

// 更新队伍名称
function updateTeamName(teamId, newName) {
    const team = teams.find(t => t.id === teamId);
    if (team && newName && newName.trim()) {
        team.name = newName.trim();
    } else if (team) {
        // 如果名称为空，恢复原名称
        team.name = team.name;
        renderTeams();
    }
}

// 导出数据
function exportData() {
    const data = {
        teams: teams,
        playersByPosition: playersByPosition,
        nextPlayerId: nextPlayerId,
        nextTeamId: nextTeamId,
        exportTime: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `队伍选人系统_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(link.href);
}

// 导入数据
function importData() {
    document.getElementById('importFile').click();
}

// 处理文件导入
function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (confirm('导入数据将覆盖当前所有数据，确定要继续吗？')) {
                teams = data.teams || teams;
                playersByPosition = data.playersByPosition || playersByPosition;
                nextPlayerId = data.nextPlayerId || nextPlayerId;
                nextTeamId = data.nextTeamId || nextTeamId;
                
                renderTeams();
                renderPlayerPool();
                alert('数据导入成功！');
            }
        } catch (error) {
            alert('文件格式错误，请选择正确的JSON文件！');
            console.error('导入错误:', error);
        }
    };
    reader.readAsText(file);
    
    // 重置文件输入，允许重复选择同一文件
    event.target.value = '';
}

// 从队伍中移除选手
function removeFromTeam(teamId, memberIndex) {
    const team = teams.find(t => t.id === teamId);
    if (team && team.members[memberIndex]) {
        const member = team.members[memberIndex];
        // 将选手放回选手池
        if (playersByPosition[member.position]) {
            playersByPosition[member.position].push(member);
        }
        team.members.splice(memberIndex, 1);
        renderTeams();
        renderPlayerPool();
    }
}

// 移除选手
function removePlayer(position, playerId) {
    if (confirm('确定要移除这名选手吗？')) {
        playersByPosition[position] = playersByPosition[position].filter(p => p.id !== playerId);
        renderPlayerPool();
    }
}

// 修改选手
function editPlayer(position, playerId) {
    const player = playersByPosition[position].find(p => p.id === playerId);
    if (player) {
        const newName = prompt('请输入选手新名称：', player.name);
        if (newName && newName.trim()) {
            player.name = newName.trim();
            renderPlayerPool();
        }
    }
}

// 添加新选手
function addNewPlayer(position) {
    const newName = prompt(`请输入新的${position}选手名称：`, `新${position}选手`);
    if (newName && newName.trim()) {
        const newPlayer = {
            id: nextPlayerId++,
            name: newName.trim(),
            position: position
        };
        playersByPosition[position].push(newPlayer);
        renderPlayerPool();
    }
}

// 绑定选手拖拽事件
function bindPlayerDragEvents() {
    document.querySelectorAll('.player-item').forEach(item => {
        item.addEventListener('dragstart', function(e) {
            this.style.opacity = '0.5';
            e.dataTransfer.setData('text/plain', JSON.stringify({
                id: this.dataset.playerId,
                name: this.dataset.playerName,
                position: this.dataset.playerPosition
            }));
        });
        
        item.addEventListener('dragend', function() {
            this.style.opacity = '1';
        });
    });
}

// 绑定队伍拖拽事件
function bindDragEvents() {
    document.querySelectorAll('.team-card').forEach(teamCard => {
        teamCard.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.backgroundColor = '#f8f9fa';
        });
        
        teamCard.addEventListener('dragleave', function() {
            this.style.backgroundColor = 'white';
        });
        
        teamCard.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.backgroundColor = 'white';
            
            const playerData = JSON.parse(e.dataTransfer.getData('text/plain'));
            const teamId = parseInt(this.dataset.teamId);
            const team = teams.find(t => t.id === teamId);
            
            // 检查选手是否已经在其他队伍中
            if (isPlayerInAnyTeam(parseInt(playerData.id))) {
                alert('该选手已被其他队伍选中！');
                return;
            }
            
            // 检查是否已经存在相同位置的选手
            const hasSamePosition = team.members.some(member => member.position === playerData.position);
            if (hasSamePosition) {
                alert(`该队伍已有${playerData.position}位置的选手！`);
                return;
            }
            
            // 检查是否已经有其他队伍使用相同选手名称
            if (isPlayerNameInOtherTeam(playerData.name, teamId)) {
                alert(`选手"${playerData.name}"已被其他队伍选中！`);
                return;
            }
            
            if (team && team.members.length < 5) {
                team.members.push({
                    id: parseInt(playerData.id),
                    name: playerData.name,
                    position: playerData.position
                });
                // 从选手池中移除该选手
                playersByPosition[playerData.position] = playersByPosition[playerData.position].filter(p => p.id !== parseInt(playerData.id));
                renderTeams();
                renderPlayerPool();
            } else {
                alert('队伍已满员！');
            }
        });
    });
}

// 绑定事件监听器
document.getElementById('addTeamBtn').addEventListener('click', addNewTeam);
document.getElementById('clearAllBtn').addEventListener('click', clearAllTeams);
document.getElementById('exportBtn').addEventListener('click', exportData);
document.getElementById('importBtn').addEventListener('click', importData);
document.getElementById('importFile').addEventListener('change', handleFileImport);

// 初始化渲染
renderTeams();
renderPlayerPool();