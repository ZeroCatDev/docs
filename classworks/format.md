---
title: 公用键格式
---

此处列举部分 Classworks 已在使用的键值格式，便于其他应用访问。你可以贡献你的应用某些键格式以便他人使用。

## Classworks 的学生列表

- **键名**：`classworks-list-main`
- **数据示例**：

```json
[
  {
    "id": 1,
    "name": "1"
  }
]
```

> 其中 `name` 为学生姓名，显示按照 `id` 排序。

## Classworks 的列表信息

- **键名**：`classworks-list-info`
- **数据示例**：

```json
[
  {
    "id": "1762055443922",
    "name": "1212"
  },
  {
    "id": "1762055446356",
    "name": "22"
  },
  {
    "id": "1762055448936",
    "name": "333"
  }
]
```

> 由用户手动创建的列表，其中 `id` 应当对应 `classworks-list-[id]` 的键。

## Classworks 的列表

- **键名**：`classworks-list-[id]`
- **数据示例**：

```json
[
  {
    "id": 1,
    "name": "1",
    "completed": false
  }
]
```

> 默认具有 `completed`（是否已完成）属性，可以自由添加其他属性。

## Classworks 的作业信息

- **键名**：`classworks-data-20200101`
- **数据示例**：

```json
{
  "homework": {
    "数学": {
      "content": "写不完"
    },
    "物理": {
      "content": "不是哥们"
    },
    "历史": {
      "content": ""
    }
  },
  "attendance": {
    "late": [
      "哈基米",
      "南北"
    ],
    "absent": [
      "绿豆"
    ],
    "exclude": []
  }
}
```

> 注意键名中日期可以是任意日期，`attendance` 数据中如果学生姓名不在 `classworks-list-main` 中可能导致 bug。

## Classworks 维护的考试看板数据列表

- **键名**：`es_list`
- **数据示例**：

```json
[
  {
    "id": "exam_example_001"
  },
  {
    "id": "exam_example_002"
  },
  {
    "id": "exam_example_003"
  }
]
```

> 注意键名可能是任意值。

## Classworks 维护的考试看板数据

- **键名**：任意，从es_list中获取
- **数据示例**：

```json
{
  "message": "请按时参加考试，携带学生证和身份证",
  "examName": "期末考试安排",
  "examInfos": [
    {
      "end": "2025/01/15 11:00",
      "name": "数学",
      "start": "2025/01/15 09:00"
    },
    {
      "end": "2025/01/16 16:00",
      "name": "英语",
      "start": "2025/01/16 14:00"
    }
  ]
}
```