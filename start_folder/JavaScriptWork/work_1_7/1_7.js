document.getElementById("searchbtn").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const resultDiv = document.getElementById("result");

    if (!username) {
        resultDiv.innerHTML = "<p>ユーザー名を入力してください。</p>"
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(res => {
            if (!res.ok) throw new Error("ユーザーが見つかりませんでした");
            return res.json();
        })

        .then(data => {
            resultDiv.innerHTML = `
<p><storong>ユーザー名：</strong> ${data.login}</p>
<p><storong>名前：</strong> ${data.name || "未設定"}</p>
<p><storong>フォロワー数：</strong> ${data.followers}</p>
<p><storong>公開リポジトリ数：</strong> ${data.public_repos}</p>
<img src="${data.avatar_url}" width="100" alt="アイコン画像"/>
`;
        })
        .catch(err => {
            resultDiv.innerHTML = `<P style="color:red;">${err.message}</p>`;

        }
        );

});